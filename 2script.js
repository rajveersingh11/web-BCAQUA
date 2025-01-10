const BASE_URL = "https://your-backend-url.com";

// Fetch and display news
async function loadNews() {
  const response = await fetch(`${BASE_URL}/news`);
  const news = await response.json();

  const newsFeed = document.getElementById('news-feed');
  news.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.content}</p>
      <small>${new Date(article.date).toLocaleDateString()}</small>
    `;
    newsFeed.appendChild(newsItem);
  });
}

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  const response = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert('Message sent successfully!');
    document.getElementById('contact-form').reset();
  } else {
    alert('Failed to send your message.');
  }
});

// Load news on page load
loadNews();