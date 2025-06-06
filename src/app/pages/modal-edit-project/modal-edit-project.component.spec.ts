import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditUsersComponent } from './modal-edit-project.component';

describe('ModalEditProjectComponent', () => {
  let component: ModalEditUsersComponent;
  let fixture: ComponentFixture<ModalEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
