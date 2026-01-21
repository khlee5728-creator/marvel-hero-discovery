import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import IntroPage from './pages/IntroPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
