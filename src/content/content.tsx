import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
// import { Bot } from 'lucide-react'
import lottieAnimation from '@/assets/new_anime.json'
import Lottie from 'lottie-react'
import ResumeContainer from '@/components/resume-container'


// import gif_anime from '@/assets/gif_anime.gif'
// import Image from 'next/image'
const ContentPage: React.FC = () => {
  const [chatboxExpanded, setChatboxExpanded] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<string | undefined>(undefined)

  const ref = useRef<HTMLDivElement>(null)

  const resumesData = [
    {
      id: 1,
      name: 'Software_Engineer_Resume.pdf',
      url: 'https://img2.freejobalert.com/news/2025/04/bank-of-baroda-financial-literacy-counselor-vacancy-742369-68071854ee71979003761.pdf',
    },
  ]

  const handleSelectionConfirm = async () => {
    if (selected) {
      console.log('Selected text:', selected)
      try {
        const response = await fetch('http://127.0.0.1:8000/api/print', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: selected }),
        })
        if (!response.ok) throw new Error('Failed to generate PDF')
          if(response.ok) {
           const data = await response.json()
           console.log('PDF generated successfully:', data)
          }
      } catch (error) {
        console.error('Error generating PDF:', error)
      }
    }
  }

  React.useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = window.getSelection()?.toString()
      console.log('Selected text:', selectedText)
      if (selectedText) {
        setSelected(selectedText)
      } else {
        setSelected(undefined)
      }
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {selected && (
        <div
          ref={ref}
          className="dark z-[9998]" // slightly lower z-index
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
          }}
        >
          <Button
            className='bg-black text-white hover:bg-gray-800'
            onClick={handleSelectionConfirm}
          >Confirm Button</Button>
        </div>
      )}
      <div
        ref={ref}
        className="dark z-[9998]" // slightly lower z-index
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
        }}
      >
        {chatboxExpanded && (
          <div className="">
            <ResumeContainer resumes={resumesData} />
          </div>
        )}
        <div className="flex justify-end">
          <Button
            size={'icon'}
            className="h-28 w-28 bg-transparent hover:bg-transparent shadow-none"
            onClick={() => setChatboxExpanded(!chatboxExpanded)}
          >
            <Lottie
              className="bg-transparent"
              height={150}
              width={150}
              animationData={lottieAnimation}
              loop={true}
            />
          </Button>
        </div>
      </div>
    </>
  )
}

export default ContentPage
