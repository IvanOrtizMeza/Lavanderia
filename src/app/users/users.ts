import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-users',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users {}
