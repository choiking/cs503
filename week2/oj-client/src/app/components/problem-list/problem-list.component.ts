import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[] = [];
  subscriptionProblems: Subscription;

  constructor(@Inject("data") private data: DataService) { }

  ngOnInit() {
    this.getProblems();
  }

  private getProblems(): void {
    this.subscriptionProblems = this.data.getProblems()
                                .subscribe(problems => this.problems = problems);
  }
}