import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupCardComponent} from './group-card/group-card.component'
import {GroupAffiliationRountingModule} from './group-affiliation-rounting.module'
import {GroupAffiliationComponent} from './group-affiliation.component'
import {SharedModule} from '../../../../shared/shared.module';
import {CardAddGroupComponent} from './card-add-group/card-add-group.component'


@NgModule({
  declarations: [GroupCardComponent, GroupAffiliationComponent, CardAddGroupComponent],
  imports: [
    CommonModule,
    GroupAffiliationRountingModule,
    SharedModule,
  ], exports: [
    CommonModule,
    GroupAffiliationRountingModule,
    SharedModule,
  ]
})
export class GroupAffiliationModule {
}
