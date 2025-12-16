import React from 'react'

export default function Footer() {
  return (
    <div>
    <section class="about" id="about">
        <div class="container about-container">
            <div class="about-image">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Productivity Tools">
            </div>
            
            <div class="about-content">
                <h2>Why Choose FocusFlow?</h2>
                <p>FocusFlow was created to solve a common problem: how to stay productive in a world full of distractions. We combine time-tested techniques with modern technology to help you take control of your time.</p>
                
                <p>Our platform is built on the principles of the Pomodoro Technique, developed by Francesco Cirillo in the late 1980s. This method uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
                
                <p>But we've taken it further by integrating task management, analytics, and personalized insights to create a complete productivity system that adapts to your workflow.</p>
                
                <div class="about-stats">
                    <div class="stat-item">
                        <span class="stat-number">94%</span>
                        <span class="stat-label">Report Increased Focus</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">3.2x</span>
                        <span class="stat-label">More Tasks Completed</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">40%</span>
                        <span class="stat-label">Time Saved Daily</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container footer-container">
            <div class="footer-column">
                <h3>FocusFlow</h3>
                <p>Your personal productivity companion. Master your time, accomplish more, and reduce stress with intelligent time management tools.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            
            <div class="footer-column">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#dashboard">Dashboard</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="#">Pomodoro Guide</a></li>
                    <li><a href="#">Productivity Tips</a></li>
                    <li><a href="#">Time Management</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </div>
            
            <div class="footer-column">
                <h3>Contact</h3>
                <ul class="footer-links">
                    <li><i class="fas fa-envelope"></i> hello@focusflow.com</li>
                    <li><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
                    <li><i class="fas fa-map-marker-alt"></i> 123 Productivity St, Work City</li>
                </ul>
            </div>
        </div>
        
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2023 FocusFlow. All rights reserved. | Designed with <i class="fas fa-heart" style="color: #e74c3c;"></i> for productive minds</p>
            </div>
        </div>
    </footer>

   
    </div>
  )
}



    