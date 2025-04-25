'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Pencil,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
// Load the worker

// Sample resume data - in a real app, this would come from an API or database
interface Resume {
  id: number
  name: string
  url: string
}


interface ResumeContainerProps {
  resumes: Resume[]
}

const ResumeContainer: React.FC<ResumeContainerProps> = ({ resumes }) => {
  const [expandedResumes, setExpandedResumes] = useState<number[]>([])

  const toggleResume = (id: number) => {
    setExpandedResumes((prev) =>
      prev.includes(id)
        ? prev.filter((resumeId) => resumeId !== id)
        : [...prev, id]
    )
  }

  return (
    <Card className="min-w-56 max-w-full max-h-[500px] mx-auto shadow-lg overflow-hidden flex flex-col">
      <CardHeader className="p-3 bg-muted/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-semibold">Resume Manager</span>
            <span className="text-sm text-muted-foreground ml-2">
              {resumes.length} resumes
            </span>
          </div>
          <Button variant="default" className="text-sm px-2 py-1">
            <ExternalLink className="h-4 w-4 mr-1" />
            Web App
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 overflow-y-auto flex-1">
        <div className="max-h-full overflow-y-auto">
          {resumes.map((resume) => (
            <div key={resume.id} className="border-b last:border-b-0">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-[150px]">
                    {resume.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => toggleResume(resume.id)}
                  >
                    {expandedResumes.includes(resume.id) ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        View
                      </>
                    )}
                  </Button>
                  <Link href={`/edit-resume/${resume.id}`}>
                    <Button variant="outline" size="small">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
              {expandedResumes.includes(resume.id) && (
                <div className="px-3 pb-3">
                  <div className="border rounded-md overflow-hidden h-[400px]">
                    <iframe
                      src={resume.url}
                      className="w-full h-full"
                      title={`Preview of ${resume.name}`}
                      allow='autoplay'
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ResumeContainer;