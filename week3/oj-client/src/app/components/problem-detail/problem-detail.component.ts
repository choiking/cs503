import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { ActivatedRoute} from "@angular/router";
import { DataService } from '../../services/data.service';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem : Problem;

  constructor(
    private route: ActivatedRoute,
    @Inject("data") private data: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data.getProblem(+params["id"])
               .then(problem => this.problem = problem);
    });
  }

}
