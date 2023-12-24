import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const Post = ({ title, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const truncatedContent = content?.length > 100 ? content?.slice(0, 100) + '...' : content;

  return (
    <Card style={{ marginBottom: '10px', height: '150px' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {truncatedContent}
        </Typography>
        {content?.length > 100 && (
          <Button onClick={handleMoreClick} color="primary">
            ...more
          </Button>
        )}
      </CardContent>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </div>
      </Modal>
    </Card>
  );
};

export default Post;
