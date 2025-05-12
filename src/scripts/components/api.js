const CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: 'c214b40d-4321-4dee-b037-8cce0ace453c',
    'Content-Type': 'application/json'
  }
};

const endpointPaths = {
  me: '/users/me',
  avatar: '/users/me/avatar',
  cards: '/cards',
  card: (cardId) => `/cards/${cardId}`,
  cardLike: (cardId) => `/cards/likes/${cardId}`
};

function apiRequest(endpoint, options = {}) {
  return fetch(`${CONFIG.baseUrl}${endpoint}`, {
    headers: CONFIG.headers,
    ...options
  }).then(handleResponse);
}

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const userAPI = {
  getUser: () => apiRequest(endpointPaths.me),

  updateUser: (name, about) =>
    apiRequest(endpointPaths.me, {
      method: 'PATCH',
      body: JSON.stringify({name, about})
    }),

  updateAvatar: (avatar) => 
    isImage(avatar).then(isValid => {
      if (!isValid) return Promise.reject('Некорректный URL.');

      return apiRequest(endpointPaths.avatar, {
        method: 'PATCH',
        body: JSON.stringify({ avatar })
      });
    })
};

const cardAPI = {
  getInitialCards: () => apiRequest(endpointPaths.cards),

  createCard: (name, link) => 
    isImage(link).then(isValid => {
      if (!isValid) return Promise.reject('Некорректный URL.');

      return apiRequest(endpointPaths.cards, {
        method: 'POST',
        body: JSON.stringify({ name, link })
      });
    }),

  deleteCard: (cardId) => 
    apiRequest(endpointPaths.card(cardId), {
      method: DELETE,
    }),

  toggleLike: (cardId, isLiked) => 
    apiRequest(endpointPaths.cardLike(cardId), {
      method: isLiked ? 'DELETE' : 'PUT'
    })
};

function isImage(url) {
  return fetch(url, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        const contentType = res.headers.get('Content-Type');
        return contentType && contentType.startsWith('image/');
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.error('Ошибка при проверке URL:', err);
      return false;
    });
};

export {userAPI, cardAPI};