import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements AfterViewInit {
  
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input() expanded: boolean = false;
  @Input() expandHeight: string = "150px";

  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }
}
