// app/admin-dashboard/trainers/page.tsx
'use client';

import { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  Eye,
  Trash2,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number; // in years
  status: 'active' | 'inactive';
  joinDate: string;
}

const initialTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Mahmud Hasan',
    email: 'mahmud@example.com',
    phone: '+8801711223344',
    specialization: 'Fitness & Strength',
    experience: 5,
    status: 'active',
    joinDate: '2022-09-12',
  },
  {
    id: '2',
    name: 'Anika Rahman',
    email: 'anika@example.com',
    phone: '+8801811334455',
    specialization: 'Yoga & Wellness',
    experience: 3,
    status: 'inactive',
    joinDate: '2023-03-25',
  },
];

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredTrainers = trainers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.phone.includes(searchQuery) ||
    t.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (trainer: Trainer) => {
    setTrainers(prev => prev.filter(t => t.id !== trainer.id));
    toast.error(`Deleted trainer ${trainer.name}`);
  };

  const handleView = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <GraduationCap className="h-6 w-6 text-blue-500 mr-2" />
            Trainers
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and view all trainers in the system
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find trainers by name, email, phone, or specialization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search trainers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trainer List</CardTitle>
          <CardDescription>{filteredTrainers.length} trainers found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainers.map((trainer) => (
                <TableRow key={trainer.id}>
                  <TableCell className="font-medium">{trainer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{trainer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm">{trainer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{trainer.specialization}</TableCell>
                  <TableCell>{trainer.experience} yrs</TableCell>
                  <TableCell>
                    <Badge variant={trainer.status === 'active' ? 'default' : 'secondary'}>
                      {trainer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(trainer.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(trainer)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(trainer)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTrainers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No trainers found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Trainer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trainer Details</DialogTitle>
            <DialogDescription>View detailed info about this trainer</DialogDescription>
          </DialogHeader>
          {selectedTrainer && (
            <div className="grid gap-4 py-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm">{selectedTrainer.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm">{selectedTrainer.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm">{selectedTrainer.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Specialization</Label>
                <p className="text-sm">{selectedTrainer.specialization}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Experience</Label>
                <p className="text-sm">{selectedTrainer.experience} years</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={selectedTrainer.status === 'active' ? 'default' : 'secondary'}>
                  {selectedTrainer.status}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Join Date</Label>
                <p className="text-sm">{new Date(selectedTrainer.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
