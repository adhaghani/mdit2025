"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { AlertTriangleIcon } from "lucide-react";

export default function TestErrorPage() {
  const triggerError = () => {
    throw new Error("This is a test error to demonstrate the error boundary");
  };

  const triggerChunkError = () => {
    throw new Error(
      "ChunkLoadError: Loading chunk failed. This simulates a common deployment error."
    );
  };

  const triggerNetworkError = () => {
    throw new Error("Network error: Failed to fetch data from server.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangleIcon className="h-6 w-6 text-destructive" />
              <CardTitle>Error Page Testing</CardTitle>
            </div>
            <Text as="p" styleVariant="muted">
              Use these buttons to test different error scenarios and see how
              the error pages work.
            </Text>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={triggerError}
                variant="destructive"
                className="w-full"
              >
                Trigger General Error
              </Button>
              <Button
                onClick={triggerChunkError}
                variant="outline"
                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                Trigger Chunk Error
              </Button>
              <Button
                onClick={triggerNetworkError}
                variant="outline"
                className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Trigger Network Error
              </Button>
              <Button
                onClick={() => (window.location.href = "/non-existent-page")}
                variant="secondary"
                className="w-full"
              >
                Go to 404 Page
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <Text as="h3" className="font-semibold mb-2">
                Available Error Pages:
              </Text>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  • <strong>404 Page:</strong> /not-found.tsx - Handles page not
                  found errors
                </li>
                <li>
                  • <strong>Error Page:</strong> /error.tsx - Handles
                  layout-level errors
                </li>
                <li>
                  • <strong>Global Error:</strong> /global-error.tsx - Handles
                  application-wide errors
                </li>
                <li>
                  • <strong>Loading Page:</strong> /loading.tsx - Shows during
                  page transitions
                </li>
                <li>
                  • <strong>Maintenance:</strong> /maintenance/page.tsx -
                  Planned maintenance page
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
