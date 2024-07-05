import { Center, Spinner, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import { FC, memo, useCallback, useEffect } from 'react';
import { UserCard } from '../organisms/layout/user/UserCard';
import { useAllUsers } from '../../hooks/useAllUsers';
import { useSelectUser } from '../../hooks/useSelectUser';
import { UserDetailModal } from '../organisms/layout/user/UserDetailModal';
import { useLoginUser } from '../../hooks/useLoginUser';

export const UserManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onClickUser = useCallback((id: number) => {
    console.log('User clicked:', id);
    onSelectUser({ id, users });
    onOpen();
  }, [onSelectUser, users, onOpen]);

  useEffect(() => {
    console.log('Modal open state:', isOpen);
  }, [isOpen]);

  useEffect(() => {
    console.log('Selected user:', selectedUser);
  }, [selectedUser]);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://images.unsplash.com/photo-1717831499998-6f5bafe9e287"
                userName={user.username}
                fullName={user.name}
                onClick={() => onClickUser(user.id)}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} user={selectedUser} />
    </>
  );
});
