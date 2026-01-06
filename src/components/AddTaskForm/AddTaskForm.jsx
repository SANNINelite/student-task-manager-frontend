import { useState } from 'react';
import api from '../../api/axios';
import styles from './AddTaskForm.module.css';

const AddTaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.dueDate) {
      setError('Title and due date are required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/tasks', formData);
      onTaskAdded(response.data);

      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (err) {
        console.log(err)
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default AddTaskForm;
