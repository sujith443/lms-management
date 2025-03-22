import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CourseList from '../components/courses/CourseList';
import Loader from '../components/common/Loader';
import { useAuth } from '../contexts/AuthContext';

const CoursesPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Mock courses data
          const mockCourses = [
            {
              id: 1,
              code: 'CS301',
              title: 'Data Structures',
              instructor: 'Dr. Ramesh Kumar',
              progress: 65,
              unreadItems: 3,
              nextClass: 'Tomorrow, 10:00 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?programming',
              department: 'Computer Science',
              status: 'active',
              description: 'This course introduces fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs.'
            },
            {
              id: 2,
              code: 'CS302',
              title: 'Database Systems',
              instructor: 'Dr. Priya Singh',
              progress: 78,
              unreadItems: 1,
              nextClass: 'Today, 2:00 PM',
              coverImage: 'https://source.unsplash.com/random/300x200/?database',
              department: 'Computer Science',
              status: 'active',
              description: 'Introduction to database design, implementation, and management with a focus on relational databases.'
            },
            {
              id: 3,
              code: 'CS303',
              title: 'Computer Networks',
              instructor: 'Prof. Suresh Reddy',
              progress: 42,
              unreadItems: 0,
              nextClass: 'Friday, 11:30 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?network',
              department: 'Computer Science',
              status: 'active',
              description: 'Covers the principles of computer networking, protocols, architecture, and network applications.'
            },
            {
              id: 4,
              code: 'CS304',
              title: 'Software Engineering',
              instructor: 'Dr. Lakshmi Rao',
              progress: 30,
              unreadItems: 5,
              nextClass: 'Thursday, 9:00 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?software',
              department: 'Computer Science',
              status: 'active',
              description: 'Principles and practices of software development including requirements, design, testing, and project management.'
            },
            {
              id: 5,
              code: 'EC301',
              title: 'Digital Electronics',
              instructor: 'Dr. Mohan Reddy',
              progress: 85,
              unreadItems: 0,
              nextClass: 'Wednesday, 2:00 PM',
              coverImage: 'https://source.unsplash.com/random/300x200/?electronics',
              department: 'Electronics',
              status: 'active',
              description: 'Introduction to digital systems, Boolean algebra, logic gates, and digital circuit design.'
            },
            {
              id: 6,
              code: 'ME302',
              title: 'Thermodynamics',
              instructor: 'Dr. Arvind Sharma',
              progress: 50,
              unreadItems: 2,
              nextClass: 'Monday, 11:00 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?engineering',
              department: 'Mechanical',
              status: 'active',
              description: 'Study of energy, heat, work, and their interconversions in physical systems.'
            }
          ];
          
          setCourses(mockCourses);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  return (
    <div className="courses-page min-vh-100 d-flex flex-column">
      <Header />
      
      <Container fluid className="flex-grow-1 py-4">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="mb-1">My Courses</h2>
              <p className="text-muted">Browse and access all your enrolled courses</p>
            </Col>
          </Row>
          
          {loading ? (
            <Loader message="Loading courses..." />
          ) : (
            <CourseList courses={courses} showFilters={true} />
          )}
        </Container>
      </Container>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;