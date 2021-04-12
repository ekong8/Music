import { Component, OnInit, Inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { MusicDataService } from "../music-data.service";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"],
})
export class AlbumComponent implements OnInit {
  album;
  private sub;
  private liveDataSub;
  id;

  constructor(
    @Inject(MatSnackBar) public data2: string,
    private route: ActivatedRoute,
    private dataService: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.liveDataSub = this.dataService
        .getAlbumById(this.id)
        .subscribe((data) => {
          {
            this.album = data;
          }

        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.liveDataSub.unsubscribe();
  }

  addToFavourites(trackId: any) {
    this.liveDataSub = this.dataService.addToFavourites(trackId).subscribe(
      (data) => {

        this.snackBar.open("Adding to favourites...", "Done", {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open("Unable to add song to favourites...", "Done", {
          duration: 1500,
        });
      }
    );
  }
}