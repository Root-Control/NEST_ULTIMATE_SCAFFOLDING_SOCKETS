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

export class ArticlesGateway implements OnGatewayInit {
  @WebSocketServer() server;

  constructor() {
    console.log('initializing');
  }

  afterInit() {
  }

  sendArticlesListFromSocket(articles) {
    console.log(this.server);
    return this.server.emit('articles', { message: 'from controller' });
  }

  /*
   *  Explicación de proceso
   *  1.- Creamos un socket llamado events, el cual al ser llamado ejecutará una respuesta
   */
  @SubscribeMessage('articles')
  findAll(client, data) {
    return this.server.emit('articles', { message: 'works' });
  }
}