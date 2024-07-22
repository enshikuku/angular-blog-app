import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
