import { useState, useEffect } from 'react';
import { getUserlist, blockUser, unblockUser } from '../../Service/Adminapi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const userList = await getUserlist();
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleBlock = async (userId, index) => {
    try {
      await blockUser(userId);
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[index].isBlocked = true;
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error blocking user:', error.message);
    }
  };

  const handleUnblock = async (userId, index) => {
    try {
      await unblockUser(userId);
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[index].isBlocked = false;
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error unblocking user:', error.message);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        user.isBlocked
                          ? handleUnblock(user._id, index)
                          : handleBlock(user._id, index)
                      }>
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
