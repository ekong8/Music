import { Component, OnInit, Output } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;

  constructor(
    private dataService: MusicDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.dataService.getAlbumById(id).subscribe((data) => (this.album = data));
  }

  addToFavourites(trackID: any) {
    if (this.dataService.addToFavourites(trackID)) {
      this.snackBar.open('Adding to Favourites...', 'Done', {
        duration: 1500,
      });
    }
  }
}