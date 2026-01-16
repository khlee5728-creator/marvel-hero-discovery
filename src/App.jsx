import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import IntroPage from './pages/IntroPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ResultPage from './pages/ResultPage.jsx'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
