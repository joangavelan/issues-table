import * as React from 'react'
import issues from './issues.json'

const openIssues = issues
  .filter((issue) => issue.status === 'open')
  .map((issue) => issue.id)

const App = () => {
  const [selectedIssues, setSelectedIssues] = React.useState<string[]>([])

  const isEveryOpenIssueSelected = React.useMemo(
    () => openIssues.every((issue) => selectedIssues.includes(issue)),
    [selectedIssues]
  )

  const handleSelect = (issueId: string) => {
    const issueIsAlreadySelected = selectedIssues.includes(issueId)

    issueIsAlreadySelected
      ? setSelectedIssues(selectedIssues.filter((id) => id !== issueId))
      : setSelectedIssues([...selectedIssues, issueId])
  }

  const toggleSelectionForAllIssues = () => {
    isEveryOpenIssueSelected
      ? setSelectedIssues([])
      : setSelectedIssues(openIssues)
  }

  return (
    <div className='h-screen grid place-items-center'>
      <div className='w-[50rem] flex flex-col gap-8 border border-gray-400 p-5 rounded-md'>
        <header className='flex gap-2 border-b border-gray-200 px-3 pb-4'>
          <input
            type='checkbox'
            checked={isEveryOpenIssueSelected}
            onChange={toggleSelectionForAllIssues}
          />
          <p>
            {!selectedIssues.length
              ? 'None selected'
              : selectedIssues.length + ' Selected'}
          </p>
        </header>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
            <div className='p-1' />
          </thead>
          <tbody>
            {issues.map(({ id, name, message, status }) => {
              const issueIsSelected = selectedIssues.includes(id)
              const issueIsOpen = status === 'open'

              return (
                <tr
                  key={id}
                  className={`${
                    !issueIsOpen ? 'text-gray-300 cursor-not-allowed' : ''
                  } ${issueIsSelected ? 'bg-gray-100' : ''}`}
                >
                  <td>
                    <div className='p-3 flex gap-2'>
                      <input
                        type='checkbox'
                        checked={issueIsSelected}
                        onChange={() => handleSelect(id)}
                        disabled={!issueIsOpen}
                      />
                      <p>{name}</p>
                    </div>
                  </td>
                  <td>{message}</td>
                  <td>
                    <div
                      className={`w-5 h-5 rounded-full mx-auto ${
                        issueIsOpen ? 'bg-green-400' : 'bg-red-400'
                      }`}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
