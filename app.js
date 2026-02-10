const FEED = document.getElementById('instagram-feed');
const STATUS = document.getElementById('instagram-status');

// Para atualizar em tempo real, configure um token válido do Instagram Graph API.
// Exemplo: https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type,timestamp&access_token=SEU_TOKEN
const INSTAGRAM_ACCESS_TOKEN = '';
const POST_LIMIT = 9;

function renderFallback(message) {
  STATUS.textContent = message;
  FEED.innerHTML = '';

  const fallbackItems = [
    'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80'
  ];

  fallbackItems.forEach((image) => {
    const card = document.createElement('a');
    card.className = 'ig-item';
    card.href = 'https://www.instagram.com/studio_vitaly/';
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML = `<img src="${image}" alt="Prévia de trabalhos Studio Vitaly">`;
    FEED.appendChild(card);
  });
}

async function loadInstagramPosts() {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    renderFallback('Conecte o token do Instagram para sincronização automática dos posts em tempo real.');
    return;
  }

  try {
    const endpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type,timestamp&limit=${POST_LIMIT}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Falha ao carregar feed');

    const data = await response.json();
    const posts = data.data || [];

    FEED.innerHTML = '';
    posts.forEach((post) => {
      const media = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
      if (!media) return;

      const item = document.createElement('a');
      item.className = 'ig-item';
      item.href = post.permalink;
      item.target = '_blank';
      item.rel = 'noopener';
      item.innerHTML = `<img src="${media}" alt="Post do Instagram Studio Vitaly">`;
      FEED.appendChild(item);
    });

    STATUS.textContent = posts.length
      ? `Última atualização: ${new Date().toLocaleString('pt-BR')}`
      : 'Sem posts disponíveis no momento.';
  } catch (error) {
    renderFallback('Não foi possível carregar o feed agora. Abra o Instagram para ver os posts ao vivo.');
  }
}

loadInstagramPosts();
