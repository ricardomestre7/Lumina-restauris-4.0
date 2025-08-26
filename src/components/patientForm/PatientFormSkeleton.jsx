import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; 
import { ChevronLeft, UserPlus, Edit3 } from 'lucide-react';

const PatientFormSkeleton = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <Card className="quantum-card shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-700 dark:to-indigo-800 text-white p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-full bg-white/20" />
            <Skeleton className="h-7 w-1/3 bg-white/20" />
            <Skeleton className="h-8 w-8 bg-white/20" />
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600" />
                <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600" />
              <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600" />
              <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Skeleton className="h-4 w-1/4 bg-gray-300 dark:bg-gray-600" />
              <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-0 pt-6 px-6 pb-6">
          <Skeleton className="h-12 w-40 bg-gray-300 dark:bg-gray-600 rounded-lg" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientFormSkeleton;