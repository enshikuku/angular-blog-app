import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {
  posts: any[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }
}
