class Server {

    constructor(host, usersCallback, costCallback) {
        this.host = host;
        this.usersCallback = usersCallback;
        this.costCallback = costCallback;

        this.socket = new WebSocket(host);

        this.socket.onopen = function() {
            alert("Соединение установлено.");
        };

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.socket.onmessage = function(event) {
            alert(event.data);
        };

        this.socket.onerror = function(error) {
            alert("Ошибка " + error.message);
        };

    }

}

export default Server;