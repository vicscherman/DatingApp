import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  //step one make a new behavioursubject
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  //step two make it an observable
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (username) => {
      this.toastr.info(username + ' has connected');
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.toastr.warning(username + ' has disconnected');
    });

    this.hubConnection.on("GetOnlineUsers", (usernames) =>{
      //step 3 pass changes to the behaviour subject
      this.onlineUsersSource.next(usernames);
      //step 4 component uses the observable for changes
      //using the async pipe. the service needs to be public in the component class file and use
      //the async pipe in the html template
    })
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((err) => console.log(err));
  }
}
