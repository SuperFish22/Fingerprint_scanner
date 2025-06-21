const video = document.getElementById('camera');

async function startCamera() {
    try {
        // Проверяем текущее разрешение
        const permissionStatus = await navigator.permissions.query({ name: 'camera' });
        
        // Настройки для задней камеры (environment = задняя, user = фронтальная)
        const constraints = {
            video: {
                facingMode: 'environment', // Явно указываем заднюю камеру
                width: { ideal: 1920 },    // Опционально: желаемое разрешение
                height: { ideal: 1080 }
            }
        };
        
        if (permissionStatus.state === 'granted') {
            // Если доступ уже есть — включаем камеру без запроса
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
        } else if (permissionStatus.state === 'prompt') {
            // Если браузер спросит пользователя
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
        } else {
            console.log('Доступ к камере запрещён');
        }
    } catch (err) {
        alert('Камера не доступна: ' + err.message);
    }
}

startCamera();
