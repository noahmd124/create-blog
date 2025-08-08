const db = firebase.firestore();
const auth = firebase.auth();

function savePost() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;
  const imageFile = document.getElementById('image').files[0];

  if (!title || !author || !content) return alert('Fill in all fields!');

  const reader = new FileReader();
  reader.onloadend = function () {
    const imageBase64 = imageFile ? reader.result : null;
    db.collection('posts').add({
      title,
      author,
      content,
      image: imageBase64,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert('Post published!');
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('content').value = '';
      document.getElementById('image').value = '';
    });
  };

  if (imageFile) reader.readAsDataURL(imageFile);
  else reader.onloadend();
}

auth.onAuthStateChanged(user => {
  if (!user && window.location.pathname.includes('dashboard')) {
    window.location.href = 'login.html';
  }
});
