class Server {

    constructor(host, username, usersCallback, costCallback) {
        this.host = host;
        this.usersCallback = usersCallback;
        this.costCallback = costCallback;
        this.username = username;
        this.send = ((object) => {
            let str = JSON.stringify(object);
            console.log("i send " + str)
            this.socket.send(str)
        }).bind(this)

        this.socket = new WebSocket(host);

        this.socket.onopen = (function () {
            this.send({
                name: this.username
            })
        }).bind(this);

        this.socket.onclose = function (event) {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        this.socket.onmessage = (function (event) {
            let object = JSON.parse(event.data);
            if (object.cost != null) {
                this.costCallback(object.cost)
            } else {
                this.usersCallback(object)
            }
        }).bind(this);

        this.socket.onerror = function (error) {
            alert("Ошибка " + error.message);
        };

        this.sendAction = (action) => {
            console.log("i wanna send " + action)
            this.send({
                action: action
            })
        }

    }


}

export default Server;