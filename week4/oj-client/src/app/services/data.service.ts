import {Injectable} from '@angular/core';
import {Problem} from '../models/problem.model';
import {PROBLEMS} from '../mock-problems';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';


@Injectable()
export class DataService {
  problems: Problem[] = PROBLEMS;
  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) {}

  getProblems(): Observable<Problem[]> {
    this.http.get<Problem[]>('api/v1/problems')
            .toPromise()
            .then((problems) => {
              this.problemsSource.next(problems);
            })
            .catch(this.handleError);
    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get<Problem>('api/v1/problems/' + id)
                    .toPromise()
                    .then((problem: Problem) => problem
                    )
                    .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.http.post<Problem>('api/v1/problems/', problem, {headers: headers})
                    .toPromise()
                    .then((mongoProblem) => {
                      this.getProblems();
                      return mongoProblem;
                    })
                    .catch(this.handleError);

  }

  buildAndRun(data): Promise<Object> {
    const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.http.post('api/v1/build_and_run', data, {headers: headers})
                    .toPromise()
                    .then((res: Response) => {
                        console.log(res);
                    })
                    .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
