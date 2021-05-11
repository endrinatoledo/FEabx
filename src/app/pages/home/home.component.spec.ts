
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule } from '@angular/common/http';
import { Routes} from '@angular/router';
import {HomeComponent} from './home.component'
import {CommonModule} from '@angular/common';
import {AvatarModule} from 'ngx-avatar';
import {SharedModule} from 'src/app/shared/shared.module'
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeRountingModule} from './home-rounting.module';
import {MenuComponent} from '../../core/components/menu/menu.component';
import {ToolbarComponent} from '../../core/components/toolbar/toolbar.component';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,MenuComponent,ToolbarComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        SharedModule,
        AvatarModule,
        HomeRountingModule
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the HomeComponent', () => {
    expect(component).not.toBeNull();
  });
});

describe('HomeRouting', () => {


  const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      children: [
        {
          path:'',
          redirectTo:"/home/dashboard",
          pathMatch:'full'
  
        },
        {
            path: 'add',
            loadChildren: () => import('./group/create-group/create-group.module').then(m=> m.CreateGroupModule),
          
        },
        {
          path:'dashboard',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: 'group',
          loadChildren: () => import('./group/group.module').then(m => m.GroupModule)
        
        },
        {
          path: 'profile',
          loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
        }
      ]
    }
  ];
  console.log(routes[0].children[2].path);
  tests(routes);
});

function tests(routes) {

  it(`HomeRouter exits `, () => {
    expect(routes).not.toBeNull();
  });
  
  it(`HomeRouter is 5 `, () => {
    expect(routes[0].children.length).toEqual(5);
  });

  it(`AddMyGroup Copmponent exists in HomeRouter`, () => {
    expect(routes[0].children[1]).not.toBeNull();
  });

  it(`from HomeCopmponent to AddGroup Copmponent `, () => {
    expect(routes[0].children[1].loadChildren).not.toBeNull();
  });
  it(`Link to  AddGroup exit`, () => {
    expect(routes[0].children[1].path).toEqual('add');
  });

  it(`dashboardCopmponent exists in HomeRouter`, () => {
    expect(routes[0].children[2]).not.toBeNull();
  });

  it(`from dashboardCopmponent to Group Copmponent `, () => {
    expect(routes[0].children[2].loadChildren).not.toBeNull();
  });
  it(`Link to dashboard exit`, () => {
    expect(routes[0].children[2].path).toEqual('dashboard');
  });
  
  it(`GroupCopmponent exists in HomeRouter`, () => {
    expect(routes[0].children[3]).not.toBeNull();
  });

  it(`from dashboardCopmponent to Group Copmponent `, () => {
    expect(routes[0].children[3].loadChildren).not.toBeNull();
  });
  it(`Link to Group exit`, () => {
    expect(routes[0].children[3].path).toEqual('group');
  });

  it(`profileCopmponent exists in HomeRouter`, () => {
    expect(routes[0].children[4]).not.toBeNull();
  });

  it(`from profileCopmponent to Group Copmponent `, () => {
    expect(routes[0].children[4].loadChildren).not.toBeNull();
  });
  it(`Link to profile exit`, () => {
    expect(routes[0].children[4].path).toEqual('profile');
  });



}

