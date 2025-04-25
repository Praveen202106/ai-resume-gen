export const handleSelectionConfirm = async (selectedText: string) => {
    console.log('Selected text:', selectedText)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: selectedText }),
      })
 
      if (!response.ok) throw new Error('Failed to generate PDF')
 
     console.log("response", response)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }