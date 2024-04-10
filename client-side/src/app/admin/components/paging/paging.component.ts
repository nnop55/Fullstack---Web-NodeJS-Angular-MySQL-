import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class PagingComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1;
  @Input() totalPages!: number;
  @Input() totalCount!: number;
  @Input() pageSize!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();


  from!: number;

  ngOnInit(): void {
    this.from = (this.pageSize * (this.currentPage - 1)) + 1
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.totalPages = changes['totalPages'].currentValue
    }
    if (changes['totalCount']) {
      this.totalCount = changes['totalCount'].currentValue
    }
  }

  prevPage(isLoop: boolean = false): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.from = ((this.pageSize * (this.currentPage - 1)) - this.pageSize) + 1 + this.pageSize
    }

    if (isLoop && this.currentPage == 1) {
      this.pageChange.emit(this.currentPage);
    } else if (!isLoop && this.currentPage >= 1) {
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage(isLoop: boolean = false): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.from = (this.pageSize * (this.currentPage - 1)) + 1
    }

    if (isLoop && this.currentPage == this.totalPages) {
      this.pageChange.emit(this.currentPage);
    } else if (!isLoop && this.currentPage <= this.totalPages) {
      this.pageChange.emit(this.currentPage);
    }
  }

  firstPage() {
    while (this.currentPage > 1) {
      this.prevPage(true)
    }
  }

  lastPage() {
    while (this.currentPage < this.totalPages) {
      this.nextPage(true)
    }
  }

}