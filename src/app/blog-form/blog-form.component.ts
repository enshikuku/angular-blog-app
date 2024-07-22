import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})

export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.loadPost();
    }
  }

  loadPost(): void {
    // Use the non-null assertion operator to assure TypeScript that postId is not null here.
    this.blogService.getPostById(this.postId!).subscribe(post => {
      this.blogForm.patchValue(post);
    });
  }
  
  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.postId) {
        // Again, use the non-null assertion operator.
        this.blogService.updatePost(this.postId!, this.blogForm.value).subscribe(() => {
          this.router.navigate(['/blog']);
        });
      } else {
        this.blogService.createPost(this.blogForm.value).subscribe(() => {
          this.router.navigate(['/blog']);
        });
      }
    }
  }
}

