import { useEffect, useState } from 'react';
import MainLayout from '../components/templates/MainLayout';
import CourseCard from '../components/molecules/CourseCard';
import SearchInput from '../components/molecules/SearchInput';
import { courseService, type Course } from '../services/course.service';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Business', 'Marketing'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses();
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (err) {
        console.error("Gagal ambil kursus", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }

    if (search) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase()) || 
        c.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [search, selectedCategory, courses]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-lexend text-gray-900 mb-3">
              Halo, <span className="text-primary">{user?.fullName?.split(' ')[0]}</span>! 👋
            </h1>
            <p className="text-gray-500 font-lexend text-base md:text-lg max-w-2xl">
              Sudah siap untuk upgrade skill hari ini? Temukan kelas terbaikmu di sini.
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <SearchInput 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </div>

        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium font-lexend whitespace-nowrap transition-all duration-200
                  ${selectedCategory === cat 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 h-[380px] p-4">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  </div>
              ))}
           </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 font-lexend mb-2">Tidak ditemukan</h3>
            <p className="text-gray-500 font-lexend">
              Coba cari dengan kata kunci lain atau ubah kategori.
            </p>
            <button 
              onClick={() => {setSearch(''); setSelectedCategory('All');}}
              className="mt-4 text-primary hover:underline font-medium font-lexend"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}