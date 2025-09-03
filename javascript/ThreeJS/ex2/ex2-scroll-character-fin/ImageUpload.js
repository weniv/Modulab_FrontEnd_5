export default class ImageUpload {
  constructor(character) {
    this.character = character;
    this.photoUpload = document.querySelector('.photo-upload');
    this.selectedFile = null;

    const closeBtn = this.photoUpload.querySelector('#close-btn');
    const fileInput = this.photoUpload.querySelector('input[type="file"]'); 
    const uploadBtn = this.photoUpload.querySelector('#upload-btn');

    closeBtn.addEventListener('click', () => this.hide());
    fileInput.addEventListener('change', e => {
      this.selectedFile = e.target.files[0];
    });
    uploadBtn.addEventListener('click', () => {
      if (this.selectedFile) {
        this.uploadPhoto(this.selectedFile);
      } else {
        alert('이미지를 선택하세요.');
      }
    });
  }

  show() {
    this.photoUpload.classList.remove('hidden');
  }

  hide() {
    this.photoUpload.classList.add('hidden');
  }

  async uploadPhoto(file) {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch(
        'https://photo-upload-test.onrender.com/api/upload',
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || '업로드 실패');
        throw new Error(error);
      }

      this.hide();
      this.character.setFaceTexture();
    } catch (error) {
      console.error(error);
    }
  }
}