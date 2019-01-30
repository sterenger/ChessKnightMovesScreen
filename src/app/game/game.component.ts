import { environment } from "./../../environments/environment";
import { Component, OnInit, Renderer2 } from "@angular/core";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { Response } from "@angular/http";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  constructor(public renderer2: Renderer2, public http: HttpClient) {}

  ngOnInit() {}

  verifyMove(div) {
    let path = "/get_move";
    let obj = {};

    $("div").removeClass("highlighted");
    $("div > img").remove();
    const element = this.renderer2.selectRootElement("#" + div.id);
    $(element).addClass("highlighted");
    var img = document.createElement("img");
    img.src = "./assets/img/knightBlack.gif";
    img.id = "picture";
    var foo = document.getElementById(div.id);
    foo.appendChild(img);

    var config = {
      params: div.id,
      headers: { Accept: "application/json" }
    };

    this.execute(environment.URL_REST + path, config);
  }

  execute(url, config): Promise<any> {
    let values: any;
    $("div").removeClass("possibleMove");
    return this.http
      .get(url, config)
      .toPromise()
      .then(data => {
        values = JSON.parse(JSON.stringify(data));
        console.log(values);
        console.log(values.length);
        for (let index = 0; index < values.length; index++) {
          const moveTo = this.renderer2.selectRootElement("#" + values[index]);
          $(moveTo).addClass("possibleMove");
        }
      });
  }
}
