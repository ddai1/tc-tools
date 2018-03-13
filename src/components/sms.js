import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import compose from 'lodash/fp/compose'
import { Container, Button, Input, Radio } from 'muicss/react'

import '../css/common.css'

class SMS extends Component {


    constructor() {
        super();

        this.state={
            mobile:'',
            content:'',
            smsSent: false,
            selectedOption: '',
        };
        this.updateMobile = this.updateMobile.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.sendSMS = this.sendSMS.bind(this);
        this.selectOnchange = this.selectOnchange.bind(this);
    }

    updateMobile(e) {
        this.setState({mobile: e.target.value})
    };

    updateContent(e) {
        this.setState({content: e.target.value})
    }

    sendSMS() {
        var payload = {
            to: {
                mobile: this.state.mobile
            },
            body: this.state.content
        }
          
        this.setState({smsSent: this.props.store.smsStore.sendSMS(payload)})
      }

    selectOnchange(e) {
        this.setState({ selectedOption: e.target.value });
    }

    render() {
        const { cmnumbers } = this.props

        // TODO: cannot use map index, odd. error says: return object.

        const CmN = ({cmn}) => {

            if (cmn.length == 1) {
                return (
                    <form>
                    <Radio label={ cmn[0] } value={ cmn[0] } onChange={this.selectOnchange} checked={ this.state.selectedOption === cmn[0] } />
                    </form>
                )
              } else if (cmn.length == 2) {
                return (
                    <form>
                    <Radio label={ cmn[0] } value={ cmn[0] } onChange={this.selectOnchange} checked={ this.state.selectedOption === cmn[0] }/>
                    <Radio label={ cmn[1] } value={ cmn[1] } onChange={this.selectOnchange} checked={ this.state.selectedOption === cmn[1] }/>
                    </form>
                )
              } else if (cmn.length == 3) {
                return (
                    <form>
                    <Radio label={ cmn[0] } value={ cmn[0] } onChange={this.selectOnchange} checked={ this.state.selectedOption === cmn[0] }/>
                    <Radio label={ cmn[1] } value={ cmn[1] } onChange={this.selectOnchange} checked={ this.state.selectedOption === cmn[1] }/>
                    <Radio label={ cmn[2] } value={ cmn[3] } onChange={this.selectOnchange} checked={ this.state.selectedOption === cmn[2] }/>
                    </form>
                )
              }
            };

        return (
            this.state.smsSent ? <p>Text message has been sent.</p> :
        <Container>
            {(cmnumbers.length > 0) ? <p>Please select one from below available number(s): </p>: <p>There is no available number for this CM, you may put the number manually if you have got the CM's email.</p>}
            {(cmnumbers.length > 0) ? <CmN cmn = { cmnumbers } /> : ''}
            <Input label="Please Put correct Chinese Mobile number prefix with +86" floatingLabel={false} onChange={this.updateMobile} placeholder={ cmnumbers[0] } value={this.state.selectedOption}/>
            <Input label="Please Put content here" floatingLabel={true} onChange={this.updateContent} />
            <Button color="danger" onClick={this.sendSMS}>Send</Button>
        </Container>);
    }
}

export default compose(
    inject((allStores) => ({ ...allStores })),
    observer
  )(SMS)