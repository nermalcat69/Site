import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WorkinProgress() {
    return (
    <Alert>
    {/* <Terminal className="h-4 w-4" /> */}
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components and dependencies to your app using the cli.
    </AlertDescription>
    </Alert>    
    );
}


