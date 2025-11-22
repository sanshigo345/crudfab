import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserTableStore } from '../store/userTableStore';

export const useUrlSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { 
    search, 
    tcknPrefix, 
    jobGroup, 
    page, 
    pageSize, 
    sortBy, 
    sortDirection,
    setSearch,
    setTcknPrefix,
    setJobGroup,
    setPage,
    setPageSize,
    setSorting
  } = useUserTableStore();

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlTckn = searchParams.get('tcknPrefix');
    const urlJob = searchParams.get('jobGroup');
    const urlPage = searchParams.get('page');
    const urlSize = searchParams.get('pageSize');
    const urlSort = searchParams.get('sortBy');

    if (urlSearch) setSearch(urlSearch);
    if (urlTckn) setTcknPrefix(urlTckn);
    if (urlJob) setJobGroup(urlJob.split(','));
    if (urlPage) setPage(Number(urlPage));
    if (urlSize) setPageSize(Number(urlSize));
    
    if (urlSort) setSorting(urlSort as any); 
  }, []); 

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (tcknPrefix) params.tcknPrefix = tcknPrefix;
    if (jobGroup && jobGroup.length > 0) params.jobGroup = jobGroup.join(',');
    if (page > 1) params.page = page.toString(); 
    if (pageSize !== 10) params.pageSize = pageSize.toString(); 
    if (sortBy && sortBy !== 'createdAt') params.sortBy = sortBy as string;
    
    if (sortDirection && sortDirection !== 'desc') {
        params.sortDirection = sortDirection;
    }

    setSearchParams(params, { replace: true });
  }, [search, tcknPrefix, jobGroup, page, pageSize, sortBy, sortDirection, setSearchParams]);
};