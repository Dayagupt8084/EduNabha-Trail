import { useState } from "react";
import { Search, Filter, Download, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

interface FilterOptions {
  subject?: string;
  language?: string;
  classLevel?: string;
  downloadStatus?: string;
  completionStatus?: string;
}

export const SearchFilters = ({ onSearch, onFilter }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search lessons by subject, title, or topic..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="destructive" className="ml-2 px-1 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filter Options</h4>
                {activeFilterCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Subject Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select value={filters.subject || ""} onValueChange={(value) => handleFilterChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="social-studies">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={filters.language || ""} onValueChange={(value) => handleFilterChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Languages</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Class Level Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Level</label>
                <Select value={filters.classLevel || ""} onValueChange={(value) => handleFilterChange("classLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Classes</SelectItem>
                    <SelectItem value="6">Class 6</SelectItem>
                    <SelectItem value="7">Class 7</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Download Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Download Status</label>
                <Select value={filters.downloadStatus || ""} onValueChange={(value) => handleFilterChange("downloadStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Lessons" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Lessons</SelectItem>
                    <SelectItem value="downloaded">Downloaded for Offline</SelectItem>
                    <SelectItem value="not-downloaded">Not Downloaded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Completion Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Completion Status</label>
                <Select value={filters.completionStatus || ""} onValueChange={(value) => handleFilterChange("completionStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Lessons" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Lessons</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Quick Filter Buttons */}
        <Button
          variant={filters.downloadStatus === "downloaded" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange("downloadStatus", filters.downloadStatus === "downloaded" ? "" : "downloaded")}
        >
          <Download className="h-4 w-4 mr-2" />
          Downloaded
        </Button>

        <Button
          variant={filters.completionStatus === "not-started" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange("completionStatus", filters.completionStatus === "not-started" ? "" : "not-started")}
        >
          <Clock className="h-4 w-4 mr-2" />
          Not Started
        </Button>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => 
            value ? (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {value}
                <button
                  onClick={() => handleFilterChange(key as keyof FilterOptions, "")}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};