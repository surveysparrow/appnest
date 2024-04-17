import React from 'react'
import {
 Button, AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogAction,
} from "@sparrowengg/twigs-react";

export default function Modal({btnLoader, handleDelete, resetModal}) {
  return (
    <AlertDialog open>
      <AlertDialogContent css={{ minWidth: 550 }}>
        <React.Fragment>
          <AlertDialogTitle>
            Delete Questions
          </AlertDialogTitle>
          <AlertDialogDescription css={{ lineHeight: '$md' }}>
            This action is irreversible, and all related data will be
            deleted accordingly. Proceed with caution.
          </AlertDialogDescription>
          <AlertDialogActions>
            <AlertDialogCancel asChild>
              <Button color="default" size="lg" onClick={resetModal}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                color="error"
                size="lg"
                css={{ marginLeft: '$3' }}
                loading={btnLoader}
                onClick={handleDelete}
              >
                Delete Questions
              </Button>
            </AlertDialogAction>
          </AlertDialogActions>
        </React.Fragment>
      </AlertDialogContent>
    </AlertDialog>
  )
}
