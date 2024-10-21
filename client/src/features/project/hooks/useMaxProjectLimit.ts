import { useUser } from '@/features/auth/user/useUser';
import { useProjects } from '../hooks/useProjects';
import { maxFreeProjectLimit } from '@/lib/constant';

export const useMaxProjectLimit = () => {
    const { data: projects } = useProjects();
    const { data: user } = useUser();
    const userPlan = user?.plan;
    console.log(user);
    const maxProjectLimit = userPlan === 'free' ? maxFreeProjectLimit : 100;

    let isMaxProjectLimitReached = false;

    if (userPlan === 'free' && (projects?.length || 0) >= maxFreeProjectLimit) {
        isMaxProjectLimitReached = true;
    }
    return {
        isMaxProjectLimitReached,
        maxProjectLimit,
        currentProjectCount: projects?.length,
    };
};
