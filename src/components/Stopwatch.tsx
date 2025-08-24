import { useState, useEffect, useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { formatTime } from "@/utils/time";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handleToggle = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    setIsRunning((isRunning) => !isRunning);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTime(0);
    setIsRunning(false);
    intervalRef.current = null;
  };

  return (
    <Card className="max-w-sm mx-auto px-8">
      <CardContent className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl text-center font-bold">Stopwatch</h2>

        <h3 className="text-xl font-semibold text-center">
          {formatTime(time)}
        </h3>

        <div className="space-x-4">
          <Button onClick={handleToggle}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            variant="secondary"
            disabled={time === 0}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
