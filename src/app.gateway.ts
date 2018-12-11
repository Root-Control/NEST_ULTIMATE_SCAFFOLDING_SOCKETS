import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()

export class AppGateway implements OnGatewayInit {
  @WebSocketServer() server;

  constructor() {
  }

  afterInit() {
    //  En cada conexión al servidor, ésta linea guardará a los usuarios
    this.server.authenticatedUsers = [];
    this.server.sockets.on('connection', function(socket) {
      this.server.authenticatedUsers.push({ time: 1 });
      console.log(this.server.authenticatedUsers);
    }); 
  }
}