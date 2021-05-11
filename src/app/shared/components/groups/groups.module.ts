import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemGroupComponent } from "./item-group/item-group.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { SharedModule } from "../../shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ChipsParticipantsComponent } from "./chips-participants/chips-participants.component";
import { UpdateImagenComponent } from "../update-imagen/update-imagen.component";
import { GroupCreateComponent } from "./group-create/group-create.component";
import { GroupContainerComponent } from "./group-container/group-container.component";
import { GroupDetailsComponent } from "./group-container/group-details/group-details.component";
// import {AngularFontAwesomeModule} from "angular-font-awesome/out-tsc/lib-es2015";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    GroupContainerComponent,
    ItemGroupComponent,
    GroupCreateComponent,
    UpdateImagenComponent,
    GroupDetailsComponent,
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    SharedModule,
    RouterModule,
    // AngularFontAwesomeModule,
    FontAwesomeModule,
  ],
    exports: [GroupContainerComponent, ItemGroupComponent, GroupCreateComponent, UpdateImagenComponent],
})
export class GroupsModule {}
