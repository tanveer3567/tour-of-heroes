import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: String[] = [];

  getMessages() {
    return this.messages;
  }

  addMessage(message: string) {

    this.messages.push(message);
  }

  clearMessges() {
    this.messages = []
  }

}
