import { async, TestBed } from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppModule} from './app.module'
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from '@angular/router';
let comp:    AppComponent;  

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        AvatarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ABX'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ABX');
  });

describe('AppComponent & AppModule', () => {
  let fixture;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ AppModule]
    })
    .overrideModule(AppModule, {
      remove: {
        imports: [ AppRoutingModule ]
      }
    }
    )

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    
    });
  }));

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });
  
  
});

describe('AppRouting', () => {
  let fixture;

  const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
    },
    {
      path: 'home',
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    }
   
  
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ AppModule,RouterTestingModule.withRoutes(routes) ]
    })
    .overrideModule(AppModule, {
      remove: {
        imports: [ AppRoutingModule ]
      }
    }
    )

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    
    });
  }));


  tests(routes);
});
function tests(routes) {

  it(`AppRouter exits `, () => {
    expect(routes).not.toBeNull();
  });
  
  it(`AppRouter is 2 `, () => {
    expect(routes.length).toEqual(2);
  });

  it(`Landing Copmponente exists in AppRouting`, () => {
    expect(routes[0]).not.toBeNull();
  });
  it(`from App Copmponente to Landing Copmponente `, () => {
    expect(routes[0].loadChildren).not.toBeNull();
  });

  it(`Link to Landing Copmponente exit`, () => {
    expect(routes[0].path).toEqual('');
  });

  it(`Home Copmponente exists in AppRouting `, () => {
    expect(routes[1]).not.toBeNull();
  });
  it(`Link to Home Copmponente exit`, () => {
    expect(routes[1].path).toEqual('home');
  });
  it(`from App Copmponente to Home Copmponente `, () => {
    expect(routes[1].loadChildren).not.toBeNull();
  });
 
  it(`Home Copmponente exists in AppRouting `, () => {
    expect(routes[1]).not.toBeNull();
  });
  it(`Link to Home Copmponente exit`, () => {
    expect(routes[1].path).toEqual('home');
  });
  it(`from App Copmponente to Home Copmponente `, () => {
    expect(routes[1].loadChildren).not.toBeNull();
  });

  
}


});
