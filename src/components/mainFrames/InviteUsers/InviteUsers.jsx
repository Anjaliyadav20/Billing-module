import React, { useState } from 'react';

const InviteUsers = ({onStepComplete, handleBack, handleSkip }) => {
  const [inputValue, setInputValue] = useState('');
  const [pendingChips, setPendingChips] = useState([]);
  const [invites, setInvites] = useState([]);



  const handleAddChip = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const isEmail = trimmed.includes('@');
    const isValidEmail = isEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (isEmail && !isValidEmail) {
      alert('Please enter a valid email address.');
      return;
    }

    const exists = pendingChips.some(chip => chip.value === trimmed);
    if (exists) return;

    setPendingChips(prev => [...prev, { value: trimmed }]);
    setInputValue('');
  };

  const handleRemoveChip = (value) => {
    setPendingChips(prev => prev.filter(chip => chip.value !== value));
  };

  const handleCommitInvites = () => {
    if (pendingChips.length === 0) return;

    const newInvites = pendingChips.map(chip => ({
      id: Date.now() + Math.random(),
      name: chip.value.includes('@') ? '' : chip.value,
      email: chip.value.includes('@') ? chip.value : '',
      permissions: { bills: true, quote: false, po: false },
    }));

    setInvites(prev => [...prev, ...newInvites]);
    setPendingChips([]);
  };

  const handleRemoveInvite = (id) => {
    setInvites(prev => prev.filter(i => i.id !== id));
  };

  const togglePermission = (id, key) => {
    setInvites(prev =>
      prev.map(i =>
        i.id === id ? { ...i, permissions: { ...i.permissions, [key]: !i.permissions[key] } } : i
      )
    );
  };

  return (
    <div className="invite-users">
        <div className='invite-users-inner'>
            <p className="step-count">STEP 4 OF 5</p>
            <div className='title'>Invite Users</div>
            <p className='subtitle'>Send a secure invite to their official email with personalized access</p>

                <div className="chips-input-wrapper">
                    <div className="chips-input-box">
                        {pendingChips.map(chip => (
                        <div key={chip.value} className="chip">
                            <span>{chip.value}</span>
                            <button onClick={() => handleRemoveChip(chip.value)}>×</button>
                        </div>
                        ))}
                        <input
                        type="text"
                        placeholder="Enter Name or Email"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddChip();
                            }
                        }}
                        />
                        <button
                        className="inline-invite-btn"
                        onClick={handleCommitInvites}
                        disabled={pendingChips.length === 0}
                        >
                        Invite
                        </button>
                    </div>
                </div>

            
            {invites.length > 0 && (
                <div>
                  <div className='invite-count'>Invites sent to {invites.length}</div>
                <div className="invite-table">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Bills</th>
                        <th>Quote</th>
                        <th>PO</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {invites.map(i => (
                        <tr key={i.id}>
                        <td>
                            <div className="user-info">
                            <div
                                className="avatar"
                                style={{ background: '#ccc' }}
                            >
                                {i.name ? i.name[0].toUpperCase() : '@'}
                            </div>
                            <div className="details">
                                {i.name && <div>{i.name}</div>}
                                {i.email && <div className="email">{i.email}</div>}
                            </div>
                            </div>
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            checked={i.permissions.bills}
                            onChange={() => togglePermission(i.id, 'bills')}
                            className='custom-checkbox'
                            />
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            checked={i.permissions.quote}
                            onChange={() => togglePermission(i.id, 'quote')}
                            className='custom-checkbox'
                            />
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            checked={i.permissions.po}
                            onChange={() => togglePermission(i.id, 'po')}
                            className='custom-checkbox'
                            />
                        </td>
                        <td>
                            <button
                            className="delete-btn"
                            onClick={() => handleRemoveInvite(i.id)}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            <div className="button-group">
                <button className="back-btn" onClick={handleBack}>← Back</button>
                <div className="flex">
                <button className="skip-btn" onClick={handleSkip}>Skip</button>
                <button className="finish-btn" onClick={onStepComplete}>Finish</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InviteUsers;
